import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilterByType } from '../pages/PetTable';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarks(
    {
        filters, filterBy, setFilterBy
    }: {
        filters: {
            filterKey: string;
            values: {
                id: number;
                value: string;
            }[];
        }
        filterBy: FilterByType[],
        setFilterBy: React.Dispatch<React.SetStateAction<FilterByType[]>>,
    }
) {
  const [item, setItem] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;
    setItem(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  console.log(filterBy)

  const handle = (id: number, value: any) => {
    setFilterBy(() => {
      let sortedFilters = filterBy;
      if(sortedFilters.length > 0) {
        if (!sortedFilters.some((x) => x.filterKey === filters.filterKey)) {
          return [...sortedFilters, { filterKey: filters.filterKey, values: value }];
        }
        sortedFilters.map((x) => {
          if(x.filterKey === filters.filterKey) {
            if (sortedFilters.some((item) => item?.values?.includes(value))) {
              return {
                filterKey: x.filterKey,
                values: [x.values].filter((y) => y !== value),
              }
            } else {
              return {
                filterKey: x.filterKey,
                values: [x.values, value]
              }
            }
          }
          return x;
        })
      }
      return [{ filterKey: filters.filterKey, values: value }];
    })
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`multiple-checkbox-label-${filters?.filterKey}`} >{filters?.filterKey}</InputLabel>
        <Select
          labelId="multiple-checkbox-label"
          id={`multiple-checkbox-${filters?.filterKey}`}
          multiple
          value={item}
          onChange={handleChange}
          input={<OutlinedInput label={filters?.filterKey} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {filters?.values.map(({id, value}) => (
            <MenuItem key={`${value}-${id}`} value={value} onClick={() => handle(id, value)}>
              <Checkbox checked={item.indexOf(value) > -1} />
              <ListItemText primary={value} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}