'use client';

import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  StepTitle,
  Text,
  Textarea,
  useDisclosure,
  useSteps,
  useToast,
  VStack
} from '@chakra-ui/react';
import { JSX, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardBackspace } from '@react-icons/all-files/md/MdKeyboardBackspace';
import { useSession } from 'next-auth/react';
import { UpdateProfileForm } from '@/interfaces';
import { axiosInstance } from '@/lib/fetcher';
import { Markdown } from '@/components/form/text/markdown';
import { CodeOfConduct, TermsAndConditions } from '@/data';
import ErrorMessage from '@/components/misc/error-message';

export type StepperSteps = {
  title: string;
  description?: string;
  content: JSX.Element;
};

type PolicyType = 'codeOfConduct' | 'termsAndConditions';

let codeOfConduct = 'Contributor Covenant Code of Conduct';
let termsAndConditions = 'Terms and conditions';

codeOfConduct = CodeOfConduct;
termsAndConditions = TermsAndConditions;

const dialogContentMap: Record<PolicyType, string> = {
  codeOfConduct,
  termsAndConditions
};

const Page = () => {
  const { status, data: session, update } = useSession();
  const { activeStep, goToNext, goToPrevious } = useSteps({ count: 2 });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dialogContent, setDialogContent] = useState('');
  const [acceptCodeOfConduct, setAcceptCodeOfConduct] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError
  } = useForm<UpdateProfileForm>();

  const user = session?.user!;
  const toast = useToast();

  if (status === 'unauthenticated') {
    return <ErrorMessage urlNotFound={true} />;
  }

  function onClickPolicy(button: PolicyType) {
    setDialogContent(dialogContentMap[button]);
    onOpen();
  }

  console.log('activeStep=', activeStep);

  const updateProfile = async (data: UpdateProfileForm) => {
    // update profile
    data.user_id = parseInt(user.id);
    data.image = String(user.image);

    setIsSubmitting(true);
    try {
      await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_BASE}/content/profile`, data);
      toast({
        description: 'Updated successfully',
        duration: 3000,
        isClosable: true
      });

      // update session
      await update({
        ...data,
        // name: data.name,
        nickname: data.nickname
      });

      window.location.replace('/');
    } catch (e) {
      toast({
        status: 'error',
        description: `Something went wrong! ${e.message}`,
        duration: 3000,
        isClosable: true
      });
      setErrorMessage(`Something went wrong! ${e.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps: StepperSteps[] = [
    {
      title: 'Services Agreement',
      content: (
        <>
          <Card borderRadius="2xl" overflow="hidden" zIndex="1">
            <CardHeader>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Avatar name="DEV COMMUNITY" src="/assets/images/devlogo-pwa-128.svg" />
                  <Box>
                    <Heading size="xl">Welcome to FS-BLOG!</Heading>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <CardBody p="3">
              <Stack divider={<StackDivider />} spacing="4">
                <Box>
                  <Stack mt="2" spacing="3">
                    <Text fontSize="xl" fontWeight="500" lineHeight="tall">
                      A constructive and inclusive social network for software developers. With you
                      every step of your journey.
                    </Text>
                  </Stack>
                </Box>
                <Box>
                  <Stack as="form" spacing="2" fontWeight="500">
                    <Checkbox onChange={() => setAcceptCodeOfConduct(!acceptCodeOfConduct)}>
                      You agree to uphold our{' '}
                      <Button
                        onClick={() => onClickPolicy('codeOfConduct')}
                        variant="link"
                        color="primary.500"
                      >
                        Code of Conduct
                      </Button>
                      .
                    </Checkbox>
                    <Checkbox
                      onChange={() => setAcceptTermsAndConditions(!acceptTermsAndConditions)}
                    >
                      You agree to our{' '}
                      <Button
                        onClick={() => onClickPolicy('termsAndConditions')}
                        variant="link"
                        color="primary.500"
                      >
                        Terms and Conditions
                      </Button>
                      .
                    </Checkbox>
                  </Stack>
                </Box>
              </Stack>
            </CardBody>
            <Flex justify="center" mb={4}>
              <Button
                size="lg"
                onClick={() => goToNext()}
                disabled={!acceptCodeOfConduct || !acceptTermsAndConditions}
              >
                Continue
              </Button>
            </Flex>
          </Card>

          <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent px="12" py="4">
              <ModalHeader pb="2">
                <Button onClick={onClose}>Back</Button>
              </ModalHeader>
              <ModalBody>
                <Markdown
                  style={{
                    h2: { fontSize: '27px', lineHeight: '36px' },
                    li: { fontSize: '18px', lineHeight: '36px' },
                    ol: {
                      fontSize: '18px',
                      lineHeight: '36px'
                    },
                    p: { fontSize: '18px', lineHeight: '36px' },
                    ul: {
                      marginTop: '18px',
                      marginBottom: '18px',
                      fontSize: '18px',
                      lineHeight: '36px'
                    }
                  }}
                >
                  {dialogContent}
                </Markdown>
              </ModalBody>
              <ModalFooter />
            </ModalContent>
          </Modal>
        </>
      )
    },
    {
      title: 'Technical profile',
      content: (
        <Box
          as="form"
          onSubmit={handleSubmit(updateProfile)}
          h="800px"
          maxH="calc(100% - 24px)"
          display="grid"
          gridTemplateRows="auto 1fr"
          bg="white"
          borderRadius="2xl"
          overflow="hidden"
          zIndex="1"
        >
          {/* Nav top */}
          <Flex as="nav" justify="space-between" p="4">
            <Box>
              <IconButton
                onClick={() => {
                  setAcceptCodeOfConduct(false);
                  setAcceptTermsAndConditions(false);
                  goToPrevious();
                }}
                aria-label="Back to previous onboarding step"
                icon={<MdKeyboardBackspace />}
                variant="flat"
                borderRadius="full"
              ></IconButton>
            </Box>
            <Box>
              <Button type="submit" isLoading={isSubmitting}>
                Continue
              </Button>
            </Box>
          </Flex>

          {/* Main */}
          <Stack spacing="6" borderTop="2px solid" px="12" py="8" overflow="auto">
            {/* Header */}
            <Stack spacing="1" as="header">
              <Heading as="h1" fontWeight="800">
                Build your profile
              </Heading>
              <Heading fontSize="xl" fontWeight="500" lineHeight="30px">
                Tell us a little bit about yourself — this is how others will see you on FS-Blog
                Community. You’ll always be able to edit this later in your Settings.
              </Heading>
            </Stack>

            {/* Avatar */}
            <Stack spacing="2" textAlign="center">
              <Box as="figure">
                <Avatar
                  src={user?.image || 'https://api.dicebear.com/9.x/pixel-art/svg'}
                  border="2px solid"
                  borderColor="base.90 !important"
                />
              </Box>
              <Heading as="h3" fontSize="xl">
                {user?.name}
              </Heading>
            </Stack>

            <Stack spacing="2" textAlign="center">
              {errorMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {errorMessage}
                </Alert>
              )}
            </Stack>

            {/* Main info */}
            <FormControl isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name', { required: 'Name is required' })} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.nickname}>
              <FormLabel>Nickname</FormLabel>
              <Input {...register('nickname', { required: 'Nickname is required' })} />
              <FormErrorMessage>{errors.nickname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Bio</FormLabel>
              <Textarea {...register('bio')} placeholder="Tell us a little about yourself" />
            </FormControl>

            {/* Work */}
            <Box>
              <Heading fontSize="27px" lineHeight="base">
                Work
              </Heading>
              <Stack spacing="3">
                <FormControl>
                  <FormLabel>Work</FormLabel>
                  <Input
                    {...register('work')}
                    placeholder="What do you do? Example: CEO at ACME Inc."
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Education</FormLabel>
                  <Input {...register('education')} placeholder="Where did you go to school" />
                </FormControl>
              </Stack>
            </Box>

            {/* Coding */}
            <Box>
              <Heading fontSize="27px" lineHeight="base">
                Coding
              </Heading>
              <FormControl>
                <FormLabel>Skills/Languages</FormLabel>
                <Textarea
                  {...register('coding_skill')}
                  placeholder="Any languages, frameworks, etc. to highlight?"
                />
              </FormControl>
              <Text mt="2" fontSize="sm" color="grey.600">
                What tools and languages are you most experienced with? Are you specialized or more
                of a generalist?
              </Text>
            </Box>

            <Box></Box>
          </Stack>
        </Box>
      )
    }
  ];

  return (
    <Box as="main" pos="fixed" inset="0" h="full" w="full" bg="warm-gray-100">
      <Flex
        direction="column"
        justify="center"
        pos="fixed"
        inset="0"
        w="90%"
        maxW={activeStep === 0 ? 'container.sm' : 'container.md'}
        m="auto"
      >
        <Flex flexDir="column">
          <Stepper index={activeStep}>
            {steps.map(({ title }) => (
              <Step key={title}>
                <VStack>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{title}</StepTitle>
                  </Box>
                </VStack>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          <VStack spacing={8} mt={8}>
            <Box w="full">{steps[activeStep].content}</Box>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page;
