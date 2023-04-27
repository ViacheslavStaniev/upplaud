import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

AppTitle.propTypes = {
  title: PropTypes.string,
  appNameOnly: PropTypes.bool,
};

export default function AppTitle({ title = '', appNameOnly = false }) {
  const APP_NAME = 'micvote';

  if (appNameOnly) return APP_NAME;

  return (
    <Helmet>
      <title>
        {title} | {APP_NAME}
      </title>
    </Helmet>
  );
}
