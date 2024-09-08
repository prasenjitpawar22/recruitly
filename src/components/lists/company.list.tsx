import { Anchor, Center, Loader, Pagination, Stack, } from "@mantine/core";
import { useEffect, useState } from "react";
import { CompanyData } from "../../types";
import { getPaginatedCompanyList } from "../../utils/queries";

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

    return <Center h={'100vh'} >
        {isLoadin ? <Loader size={30} />
            :
            <Stack justify="center" align="center" >
                {data?.data?.map((c) => (
                    <Anchor key={c.id} href={`${c.id}`} > {c.name} </Anchor>
                ))}
                <Pagination total={total / 10} value={activePage} onChange={setPage} mt="sm" />
            </Stack>
        }
    </Center>
}