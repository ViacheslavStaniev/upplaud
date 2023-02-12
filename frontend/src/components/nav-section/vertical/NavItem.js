import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Tooltip, Link, ListItemText } from '@mui/material';
// locales
import { useLocales } from '../../../locales';
// auth
import RoleBasedGuard from '../../../auth/RoleBasedGuard';
//
import Iconify from '../../iconify';
//
import { StyledItem, StyledIcon, StyledDotIcon } from './styles';

// ----------------------------------------------------------------------

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  item: PropTypes.object,
  depth: PropTypes.number,
  isExternalLink: PropTypes.bool,
};

export default function NavItem({ item, depth, open, active, isExternalLink, ...other }) {
  const { translate } = useLocales();

  const { title, path, icon, info, children, disabled, caption, roles } = item;

  const subItem = depth !== 1;

  const renderContent = (
    <StyledItem depth={depth} active={active} disabled={disabled} caption={!!caption} {...other}>
      {icon && <StyledIcon>{icon}</StyledIcon>}

      {subItem && (
        <StyledIcon>
          <StyledDotIcon active={active && subItem} />
        </StyledIcon>
      )}

      {active && !subItem && (
        <Box
          sx={{
            zIndex: -1,
            position: 'absolute',
            height: 50,
            width: 50,
            top: -50,
            right: 0,
            bgcolor: 'background.default',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: 'background.purple',
              borderRadius: '0 0 100px 0',
            }}
          />
        </Box>
      )}

      <ListItemText
        primary={`${translate(title)}`}
        secondary={
          caption && (
            <Tooltip title={`${translate(caption)}`} placement="top-start">
              <span>{`${translate(caption)}`}</span>
            </Tooltip>
          )
        }
        primaryTypographyProps={{
          noWrap: true,
          component: 'span',
          variant: active ? 'subtitle2' : 'body2',
        }}
        secondaryTypographyProps={{ noWrap: true, variant: 'caption' }}
      />

      {active && !subItem && (
        <Box
          sx={{
            zIndex: -1,
            position: 'absolute',
            height: 50,
            width: 50,
            bottom: -50,
            right: 0,
            bgcolor: 'background.default',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              bgcolor: 'background.purple',
              borderRadius: '0 100px 0 0',
            }}
          />
        </Box>
      )}

      {info && (
        <Box component="span" sx={{ lineHeight: 0 }}>
          {info}
        </Box>
      )}

      {!!children && (
        <Iconify
          width={16}
          sx={{ ml: 1, flexShrink: 0 }}
          icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        />
      )}
    </StyledItem>
  );

  const renderItem = () => {
    // ExternalLink
    if (isExternalLink)
      return (
        <Link href={path} target="_blank" rel="noopener" underline="none">
          {renderContent}
        </Link>
      );

    // Has child
    if (children) return renderContent;

    // Default
    return (
      <Link component={RouterLink} to={path} underline="none">
        {renderContent}
      </Link>
    );
  };

  return <RoleBasedGuard roles={roles}> {renderItem()} </RoleBasedGuard>;
}
