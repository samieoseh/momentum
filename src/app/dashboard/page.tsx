import { getUsers } from "@/api/users";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  console.log({ data });
  return (
    <div className="mx-auto w-[80%]">
      <h1 className="text-2xl">List of users</h1>
      {data?.map((item: { firstName: string }) => (
        <p>{item.firstName}</p>
      ))}
    </div>
  );
}
