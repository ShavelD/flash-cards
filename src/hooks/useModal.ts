import { useState } from 'react'

const useModal = () => {
    const [itemModalOpen, setItemModalOpen] = useState<boolean>(false)

    const toggle = () => {
        setItemModalOpen(itemModalOpen => !itemModalOpen)
    }

    return {
        itemModalOpen,
        toggle,
    }
}

export default useModal