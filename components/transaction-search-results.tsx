import React from "react";
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query";

type Props = {
    search: string;
}

const fetchSearchResults = async (search: string) => {
    // return a promise of an array of strings that match the search this is a mock
    // implementation

    return new Promise<{ searchResults: string[]; search: string }>((resolve) => {
        setTimeout(() => {
            resolve({ search: search, searchResults: ["test", "test2"] });
        }, 1000);
    });
}
const TransactionSearchResults = (props: Props) => {

    const { search } = props;
    
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["searchResults", search],
        queryFn: fetchSearchResults,
        enabled: search.length > 3,
    });

    return (
        <motion.div className="w-full bg-neutral-900 px-2 py-1 rounded mt-1.5 mr-3 absolute z-50">
            <span>
                penis cock enjoyer
            </span>
        </motion.div>
    );
}

export default TransactionSearchResults