import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { getGuestsList, deleteGuest, deleteManyGuests } from '../../redux/slices/guests';
import { useAuthContext } from '../../auth/useAuthContext';

export const TemplatesContext = createContext(null);

export const useTemplatesContext = () => {
  const context = useContext(TemplatesContext);

  if (!context) throw new Error('useTemplatesContext context must be use inside TemplatesProvider');

  return context;
};

TemplatesProvider.propTypes = { children: PropTypes.node };

export default function TemplatesProvider({ children }) {
  const dispatch = useDispatch();

  const { user } = useAuthContext();
  const { guests, error, isLoading } = useSelector((state) => state.guests);

  useEffect(() => {
    dispatch(getGuestsList(user.show?._id));
  }, [user.show?._id, dispatch]);

  // On Guest Delete
  const onGuestDelete = useCallback(async (guestId) => dispatch(deleteGuest(guestId)), [dispatch]);

  // On Many Guest Delete
  const onManyGuestDelete = useCallback(async (ids) => dispatch(deleteManyGuests(ids)), [dispatch]);

  if (error) console.log('error in guest provider', error);

  const memoizedValue = useMemo(
    () => ({ guests, isLoading, onGuestDelete, onManyGuestDelete }),
    [guests, isLoading, onGuestDelete, onManyGuestDelete]
  );

  return <TemplatesContext.Provider value={memoizedValue}>{children}</TemplatesContext.Provider>;
}
