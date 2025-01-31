import { Badge, BadgeProps, HStack, Stack, Text } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { IconBadge } from '../misc/user-interaction-icons';

interface SideNavItem {
  title: React.ReactNode;
  url: LinkProps['href'] | undefined;
  external?: boolean;
  status?: string;
}

interface SideNavProps {
  currentUrl?: string;
  title?: React.ReactNode;
  status?: string;
  items: Array<SideNavItem>;
}

const StatusBadge = (props: BadgeProps) => (
  <Badge size="xs" textStyle="xs" variant="solid" colorPalette="teal" {...props} />
);

export const MenuText = ({
  title,
  isTag,
  count
}: {
  title: string;
  isTag?: boolean;
  count?: any;
}) => {
  return (
    <HStack justify="space-between">
      <Text>{isTag ? `#${title}` : `${title}`}</Text>
      <IconBadge value={count} />
    </HStack>
  );
};

export const SideNav = (props: SideNavProps) => {
  const { title, items, currentUrl, status } = props;
  return (
    <Stack gap="2">
      {title && (
        <HStack ps="4" fontWeight="semibold">
          {title}
          {status && <StatusBadge>{status}</StatusBadge>}
        </HStack>
      )}
      <Stack gap="1px">
        {items.map((item, index) => (
          <HStack
            key={index}
            py="1.5"
            ps="4"
            pe="3"
            rounded="sm"
            color="fg.muted"
            _hover={{
              layerStyle: 'fill.subtle'
            }}
          >
            <Link href={item.url!} aria-current={item.url === currentUrl ? 'page' : undefined}>
              {item.title}
              {item.status && <StatusBadge>{item.status}</StatusBadge>}
            </Link>
          </HStack>
        ))}
      </Stack>
    </Stack>
  );
};
