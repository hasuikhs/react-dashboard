import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { GridHead, GridToolbar, GridControlMenu } from '../../components/grid';

// --------------------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'serverNm', label: '서버명', alignRight: false },
  { id: 'serverId', label: '서버 ID', alignRight: false },
  { id: 'cpuCnt', label: 'CPU', alignRight: false },
  { id: 'ram', label: 'RAM', alignRight: false },
  { id: 'disk1', label: 'DISK 1', alignRight: false },
  { id: 'disk2', label: 'DISK 2', alignRight: false },
  { id: 'isActive', label: '사용 상태', alignRight: false },
  { id: 'groupNm', label: '그룹', alignRight: false },
  { id: 'regDt', label: '등록 시간', alignRight: false },
  { id: 'updDt', label: '수정 시간', alignRight: false }
]

// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
