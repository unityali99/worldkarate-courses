import AdminForm from "@/components/Form/AdminForm";
import UserSeachForm from "@/components/Form/UserSeachForm";
import { Box } from "@chakra-ui/react";

function AdminPage() {
  return (
    <Box className="space-y-20 mb-28">
      <AdminForm />
      <UserSeachForm />
    </Box>
  );
}

export default AdminPage;
