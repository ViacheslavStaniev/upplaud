import PropTypes from 'prop-types';
// @mui
import { List, Stack } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
//
import { StyledSubheader } from './styles';
import NavList from './NavList';

NavSectionVertical.propTypes = {
  sx: PropTypes.object,
  data: PropTypes.array,
};

export default function NavSectionVertical({ data, sx, ...other }) {
  const { translate } = useLocales();

  return (
    <Stack sx={sx} {...other}>
      {data.map((group) => {
        const key = group.subheader || group.items[0].title;

        return (
          <List key={key} disablePadding>
            {group.subheader && <StyledSubheader disableSticky>{`${translate(group.subheader)}`}</StyledSubheader>}

            {group.items.map((list) => (
              <NavList depth={1} data={list} hasChild={!!list.children} key={list.title + list.path} />
            ))}
          </List>
        );
      })}
    </Stack>
  );
}
