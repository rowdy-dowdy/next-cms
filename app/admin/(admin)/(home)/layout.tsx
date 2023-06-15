import HomeSideBar from "@/components/admin/HomeSideBar";
import NestedLayoutHomeAdmin from "@/components/admin/NestedLayoutHomeAdmin";
import db from "@/lib/server/prismadb";
import { redirect } from "next/navigation";

export async function getDataTypes() {
  return await db.dataType.findMany()
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const dataTypes = await getDataTypes()

  return (
    <NestedLayoutHomeAdmin data={dataTypes}>
      <div className="w-full h-full flex">
        <div className="flex-none">
          <HomeSideBar data={dataTypes} />
        </div>
        <div className="flex-grow min-w-0">
          {children}
        </div>
      </div>
    </NestedLayoutHomeAdmin>
  );
}
