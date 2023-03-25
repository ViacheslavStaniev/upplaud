import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { getGuestsList, deleteGuest, deleteManyGuests } from '../../redux/slices/guests';
import { useAuthContext } from '../../auth/useAuthContext';

export const GuestsContext = createContext(null);

export const useGuestsContext = () => {
  const context = useContext(GuestsContext);

  if (!context) throw new Error('useGuestsContext context must be use inside GuestsProvider');

  return context;
};

GuestsProvider.propTypes = { children: PropTypes.node };

export function GuestsProvider({ children }) {
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

  return <GuestsContext.Provider value={memoizedValue}>{children}</GuestsContext.Provider>;
}
