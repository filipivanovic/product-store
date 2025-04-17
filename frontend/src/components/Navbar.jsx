import { Button, Container, HStack, Link, Text, Flex, useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon, IoSunny } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container maxW="1140px" px={4} >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"} flexDir={{base: 'column', sm: 'row'}}>
        <Text
          bgGradient={"linear(to-r,cyan.400, blue.500)"}
          bgClip='text'
          fontSize={{base: "22", sm: "28"}}
          fontWeight='bold'
          textAlign="center"
          textTransform="uppercase"
        >
          <Link to={ "/" }>Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to={ "/create" }></Link>
          <Button>
            <PlusSquareIcon fontSize={20} />
          </Button>
          <Button onClick={toggleColorMode}>
            {colorMode === "dark" ? <LuSun size={20} /> : <IoMoon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  )
}

export default Navbar
