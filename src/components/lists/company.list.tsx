import { Card, Center, Loader, Pagination, Stack, Text, } from "@mantine/core";
import { useEffect, useState } from "react";
import { Company, CompanyData } from "../../types";
import { getPaginatedCompanyList } from "../../utils/queries";
import { Link } from "react-router-dom";

const SIZE = 10

export function CompanyList() {
    const [isLoadin, setIsloadin] = useState(true)
    const [activePage, setPage] = useState(0);
    const [total, setTotal] = useState(0)
    const [data, setData] = useState<CompanyData>()

    useEffect(() => {
        (async () => {
            try {
                setIsloadin(true)
                const response = await getPaginatedCompanyList({ page: activePage, size: SIZE })
                const data = response.data as CompanyData
                setData(data)
                setTotal(data.totalCount)
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsloadin(false)
            }
        })()
    }, [activePage])

    return <Center h={'80vh'}>
        <Stack justify="center" align="center">
            <Card withBorder radius={'md'} p={40} shadow="md" className="lg:w-[500px] w-[300px]">
                <Text fw={500} fz={'h3'} color="gray.8" >Company Names</Text>
                <Text fw={400} fz={'sm'} color="gray.8" className="opacity-50" >List of all the company.</Text>
                <div className="lg:max-h-[600px] h-[400px] flex flex-col overflow-y-auto mb-2 gap-3 mt-8" >
                    {isLoadin ?
                        <span className="h-full justify-center items-center flex">
                            <Loader size={30} />
                        </span>
                        :
                        data?.data?.map((c) => (
                            c.name ? <List key={c.id} company={c} /> : null
                        ))}
                </div>
            </Card>
            <Pagination total={Math.ceil(total / SIZE) - 1} value={activePage} onChange={setPage} mt="sm" />
        </Stack>
    </Center>
}

function List({ company }: { company: Company }) {
    return <Link to={`${company.id}`} className="flex w-full py-2 px-3 items-center group relative rounded-md  ">
        <span className="absolute w-[100%] inset-0 bg-gray-50 ease-in-out rounded-md scale-95 invisible group-hover:visible group-hover:scale-100 transition-transform duration-200" ></span>
        <span className="group-hover:underline text-xs group-hover:text-gray-500 text-gray-500 md:text-sm group-hover:translate-x-1 transition-transform duration-200">
            {company.name}
        </span>
    </Link>
}