import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
// import { ChatState } from '../../Context/ChatProvider';

const UserListItem = ({ users , handleFunction }) => {
    // const { user } = ChatState();
    // console.log(handleFunction, "search" , user)
  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    bg="#E8E8E8"
    _hover={{
      background: "#38B2AC",
      color: "white",
    }}
    w="100%"
    display="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    mb={2}
    borderRadius="lg"
  >
    <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={users.name}
        src={users.pic}
      />
      <Box>
        <Text>{users.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {users.email}
        </Text>
      </Box>
  </Box>

  )
}

export default UserListItem