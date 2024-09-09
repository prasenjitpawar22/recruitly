import { Button, Center, Flex, Modal } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { AddCompanyForm } from "../forms/add-company.form";

export function AddCompanyModal() {
    const [opened, { open, close }] = useDisclosure(false);

    return <Center>
        <Flex w={450} p={2} justify={'end'} mr={12}>
            <Modal opened={opened} onClose={close} title="Add Company">
                <AddCompanyForm close={close} />
            </Modal>
            <Button radius={'md'} onClick={open} >Add company</Button>
        </Flex>
    </Center >
}