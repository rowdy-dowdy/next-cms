import HomeSideBar from "@/components/admin/HomeSideBar";

async function getData() {
  const res = await fetch(process.env.NEXTAUTH_URL + '/api/admin/database/data-types')
  if (!res.ok) {
    null
  }

  console.log('asdf')

  return await res.json();
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const data = await getData()

  console.log({data})

  return (
    <div className="w-full h-full flex">
      <div className="flex-none">
        <HomeSideBar />
      </div>
      <div className="flex-grow min-w-0">
        {children}
      </div>
    </div>
  );
}
