import { TableRow, TableCell, Checkbox } from "@mui/material";
import TableBody from '@mui/material/TableBody';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { TableData } from "../pages/PetTable";

const EnhancedTableBody = (
	{
		selected, setSelected, visibleRows, emptyRows, dense,
	} : {
		selected: readonly number[],
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>,
		visibleRows: TableData[],
		emptyRows: number,
		dense: boolean,
}) => {

	const isSelected = (id: number) => selected.indexOf(id) !== -1;

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];
	
		if (selectedIndex === -1) {
		  newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
		  newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
		  newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
		  newSelected = newSelected.concat(
			selected.slice(0, selectedIndex),
			selected.slice(selectedIndex + 1),
		  );
		}
		setSelected(newSelected);
	  };

    return(
        <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
					  	icon={<FavoriteBorder />}
					  	checkedIcon={<Favorite />}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.temperament}</TableCell>
                    <TableCell align="left">{row.life_span}</TableCell>
                    <TableCell align="left">{row.origin}</TableCell>
                    <TableCell align="left">{row.breed_group}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
    )
}

export default EnhancedTableBody;