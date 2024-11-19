import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MUIPagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleChange = (event, page) => {
        onPageChange(page); // Trigger the callback for page change
    };

    return (
        <Stack
            spacing={2}
            alignItems="center"
            direction="row"
            justifyContent="center"
        >
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                siblingCount={1} // Show one sibling (e.g., 3 ... 7)
                boundaryCount={1} // Show one boundary (e.g., 1 ... 10)
                shape="rounded" // Rounded buttons
                color="primary" // Primary color scheme

            />
        </Stack>
    );
};

export default MUIPagination;
