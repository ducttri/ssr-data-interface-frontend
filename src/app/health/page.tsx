"use client";

import { Box, Grid, Tab, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { JSONData } from "@/types/types";
import GraphList from "@/components/GraphsList";
import Table from "@/components/Table";
import EnhancedTable from "@/components/Table";

export default function health() {
  const [data, setData] = useState<
    [{ _id: string; timestamp: number[] }] | null
  >(null);

  useEffect(() => {
    const fetchDataWrapper = async () => {
      try {
        const res = await fetch("/api/fetchId");
        if (!res.ok) throw new Error(await res.text());
        const returndata = await res.json();
        let json: [{ _id: string; timestamp: number[] }] = returndata.data;
        setData(json);
        console.log(json[0]._id);
      } catch (error) {
        console.log("test");
      }
    };

    fetchDataWrapper();
  }, []);

  return (
    <Typography variant="h3" gutterBottom>
      Health
      <Grid container columns={2}>
        {data && <EnhancedTable inputData={data}></EnhancedTable>}
      </Grid>
    </Typography>
  );
}
