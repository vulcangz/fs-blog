import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <Box maxW="1280px" px={4} mx="auto">
      {children}
    </Box>
  );
};

export default Container;
