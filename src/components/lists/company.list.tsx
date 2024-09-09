import { Anchor, Card, Center, Flex, Loader, Pagination, Stack, Text, } from "@mantine/core";
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

    return <Center h={'80vh'}>
        <Stack justify="center" align="center" >
            <Card withBorder radius={'md'} shadow="sm" >
                <Text fw={500}>Company names</Text>
                <Text fw={400} fz={'xs'} color={'var(--mantine-color-dimmed)'} >List of all the company.</Text>
                <Flex h={500} w={400} gap={12} align={'center'} direction={'column'} justify={'center'} >
                    {isLoadin ? <Loader size={30} />
                        :
                        data?.data?.map((c) => (
                            <Anchor key={c.id} href={`${c.id}`} > {c.name} </Anchor>
                        ))}
                </Flex>
            </Card>
            <Pagination total={Math.ceil(total / SIZE) - 1} value={activePage} onChange={setPage} mt="sm" />
        </Stack>
    </Center>
}