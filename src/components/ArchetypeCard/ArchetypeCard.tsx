import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CloseIcon from '@material-ui/icons/Close';
import { Wrapper, Header, Content, LockGroup, CloseButton } from './Components';
import { Archetype } from '../../models/Visit';

export interface ArchetypeCardProps {
  archetype?: Archetype;
  removeItemFn?: Function;
}

export const ArchetypeCard = (props: ArchetypeCardProps) => {
  const { archetype, removeItemFn } = props;
  return archetype ? (
    <Wrapper>
      <Header>
        <span>{archetype.name}</span>
        {removeItemFn && (
          <CloseButton onClick={(e: any) => removeItemFn!(e, archetype.id)}>
            <CloseIcon />
          </CloseButton>
        )}
      </Header>
      <Content>
        {archetype.lockGroupNames.map(item => (
          <LockGroup key={item}>
            <MeetingRoomIcon /> {item}
          </LockGroup>
        ))}
      </Content>
    </Wrapper>
  ) : null;
};
