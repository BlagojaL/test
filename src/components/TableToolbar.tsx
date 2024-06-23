import { Toolbar, Typography } from "@mui/material";
import { alpha } from '@mui/material/styles';
import { useMemo } from "react";
import MultipleSelectCheckmarks from "./Select";
import { FilterByType, TableData } from "../pages/PetTable";

export interface EnhancedTableToolbarProps {
    allItems: TableData[];
    filterFields: string[];
    numSelected: number;
    filterBy: FilterByType[],
    setFilterBy: React.Dispatch<React.SetStateAction<FilterByType[]>>,
}

const TableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, allItems, filterFields, filterBy, setFilterBy } = props;
    const visibleFilters = useMemo(
        () => {
            return filterFields.map((filter) => {
                const itemsByKey = allItems.map((x) => {
                    return {
                        id: x.id,
                        value: `${x[filter as keyof TableData]}`
                    }
                });
                const withoutDupplicates = itemsByKey.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                      t.value === value.value
                    ))
                  )
                return {filterKey: filter, values: withoutDupplicates};
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterFields]
      );

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} favourites
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Dog Breeds
          </Typography>
        )}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
          {visibleFilters && visibleFilters?.length > 0 && (
                    visibleFilters.map((item) => {
                        return <MultipleSelectCheckmarks
                            filters={item}
                            filterBy={filterBy}
                            setFilterBy={setFilterBy}
                        />
                    })
                )}

          </div>
      </Toolbar>
    );
  }

export default TableToolbar;