import { redirect } from "next/navigation";
import { getDataTypes } from "./layout";

export const revalidate = 0

export default async function Page() {
  const dataTypes = await getDataTypes()

  if (dataTypes.length > 0) {
    redirect('/admin/'+dataTypes[0].name)
  }

  return (
    <div className="p-6">
      Không có bảng cơ sở dữ liệu nào, hãy tạo bảng mới
    </div>
  );
}
