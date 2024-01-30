import { useAuthStore } from "@/auth/useAuthStore";

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <h2>HOME</h2>
      {user?.userId} <br />
      {user?.userName}
    </div>
  );
};

export default Home;
