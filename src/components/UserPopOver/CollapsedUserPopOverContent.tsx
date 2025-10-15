import { Avatar, Text } from '@mantine/core';
import classes from './CollapsedUserPopOverContent.module.css';
import { useAppSelector } from '@/store';

export default function CollapsedUserPopOverContent() {
  const { fullName, username } = useAppSelector((state) => state.auth.user);
  const name = fullName || username || '';
  const parts = name.split(' ');
  const firstNameInitial = parts[0]?.[0] || '';
  const lastNameInitial = parts[1]?.[0] || '';

  return (
    <>
      <div className={classes.contentWrapper}>
        <Avatar color={'blue'} radius={'lg'}>
          {firstNameInitial + lastNameInitial}
        </Avatar>
        <div>
          <Text style={{ fontWeight: 'bold' }} size="md">
            {name}
          </Text>
          <Text size="xs">{username}</Text>
        </div>
      </div>
    </>
  );
}
