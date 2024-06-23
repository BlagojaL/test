import React, { useEffect, useState } from "react";
import EnhancedTable from "../components/Table";
import { HeadCell } from "../components/tableTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../data/reducers";
import { DogType } from "../data/reducers/dogs";
import { fetchData } from "../actions";
import { CircularProgress } from "@mui/material";

export interface TableData {
    id: number;
    name: string;
    temperament: string;
    life_span: string;
    origin: string;
    breed_group: string;
  };

export interface FilterByType {
    filterKey: string,
    values: string[],
}

  const headCells: readonly HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Breed Name',
    },
    {
      id: 'temperament',
      numeric: false,
      disablePadding: false,
      label: 'Temperament',
    },
    {
      id: 'life_span',
      numeric: false,
      disablePadding: false,
      label: 'Life Span',
    },
    {
      id: 'origin',
      numeric: false,
      disablePadding: false,
      label: 'Origin',
    },
    {
      id: 'breed_group',
      numeric: false,
      disablePadding: false,
      label: 'Breed Group',
    },
  ];

  const filter = ['name', 'breed_group'];

const PetTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const data: DogType[] = useSelector((state: RootState) => state.dogs.data);
    const isLoading = useSelector((state: RootState) => state.dogs.isLoading);
    const error = useSelector((state: RootState) => state.dogs.error);
    const [favouritesSelected, setFavouritesSelected] = useState<readonly number[]>([]);
    const [filterBy, setFilterBy] = useState<FilterByType[]>([]);

    // console.log(filterBy)

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return(
        <div>
            {isLoading && <CircularProgress />}
            {!isLoading && !error && (
                <EnhancedTable
                    data={data}
                    filter={filter}
                    headCells={headCells}
                    selected={favouritesSelected}
                    setSelected={setFavouritesSelected}
                    filterBy={filterBy}
                    setFilterBy={setFilterBy}
                />
            )}
            {error && <div>{error}</div>}
        </div>
    );
}

export default PetTable;