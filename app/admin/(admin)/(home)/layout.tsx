import HomeSideBar from "@/components/admin/HomeSideBar";
import db from "@/lib/server/prismadb";

export const revalidate = 0

export const getDataTypes = async ()  => {
  return await db.dataType.findMany()
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const dataTypes = await getDataTypes()

  return (
    <div className="w-full h-full flex">
      <div className="flex-none">
        <HomeSideBar data={dataTypes} />
      </div>
      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
}
