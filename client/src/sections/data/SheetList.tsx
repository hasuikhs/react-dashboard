import { useState, useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemButton, ListItemText, Alert } from '@mui/material';
// utils
import { requestAPI } from '../../common/API';

// --------------------------------------------------------------------------------

const CustomList = styled(List)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '5px',
  color: '#808080',
  border: '1px solid #CCCCCC',
  display: 'flex',
  flexDirection: 'row',
  height: '38px',
  padding: 0
}));

// --------------------------------------------------------------------------------

function SheetList(): JSX.Element {
  const [sheetData, setSheetData] = useState([]);

  const getSheetData = async () => {
    let res = await requestAPI({
      type: 'GET',
      url: '/api/sheet'
    });

    setSheetData(res.slice(0, 2));
  }

  useEffect(() => {
    getSheetData();
  }, []);


  return sheetData.length > 0
    ? ( <CustomList sx={{ float: 'right' }} >
          {
            sheetData.map((sheet: any, idx: number) => (
              <ListItem key={ idx } disablePadding>
                <ListItemButton sx={{ height: '38px' }} target="_blank" href={ sheet.sheetUrl } >
                  <ListItemText primary={ sheet.sheetNm } />
                </ListItemButton>
              </ListItem>
            ))
          }
        </CustomList>
      )
    : (
        <Alert
          severity="error"
          sx={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'end' }}
        >
          등록된 Sheet가 없습니다. Sheet를 등록해주세요.
        </Alert>
      )
}

// --------------------------------------------------------------------------------

export default SheetList;