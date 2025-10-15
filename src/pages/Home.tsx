import React from 'react';
import { Group, Button, Flex, Input, FileInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { IconVideo, IconRecycle } from '@tabler/icons-react';
import { VideoResource } from '@/@types/home';

import './Home.module.css';
export default function Home() {
  const dateConfig = {
    withDropdown: true,
    popoverProps: { withinPortal: false },
    format: '12h',
  };
  const video_icon = <IconVideo size={18} stroke={1.5} />;
  const del_icon = <IconRecycle size={18} stroke={1.5}></IconRecycle>;
  function del_video() {}
  return (
    <>
      <form action="">
        <Group>
          <Flex
            mih={100}
            gap="xl"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
            mt={'xs'}
          >
            <Input.Wrapper label={'大标题'} flex={2}>
              <Input></Input>
            </Input.Wrapper>
            <Input.Wrapper label={'小标题'} flex={2}>
              <Input></Input>
            </Input.Wrapper>
            <Input.Wrapper label={'底部标题'} flex={2}>
              <Input></Input>
            </Input.Wrapper>
            <Group flex={1}>
              <video
                width={'100px'}
                height={'100px'}
                src="https://token2049.nyc3.cdn.digitaloceanspaces.com/Singapore/Homepage/home-hero-video-15-aug.mp4"
              ></video>
              <Button size="xs" leftSection={del_icon}>
                删除视频
              </Button>
              <FileInput
                accept="video/mp4"
                leftSection={video_icon}
                label="视频"
                placeholder="上传视频"
              ></FileInput>
            </Group>
          </Flex>
        </Group>
        <DateTimePicker label="顶部活动倒计时" placeholder="Pick date and time" />
        <Group justify="flex-end" mt="md">
          <Button type="submit">更新</Button>
        </Group>
      </form>
      <Flex
        mih={100}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        mt={'xs'}
      >
        <Group flex={1}>
          <form action="">
            <DateTimePicker label="底部活动倒计时" placeholder="Pick date and time" />
            <Group justify="flex-end" mt="md">
              <Button type="submit">更新</Button>
            </Group>
          </form>
        </Group>
        <Group flex={1}>
          <form action="">
            <DateTimePicker label="底部活动倒计时" placeholder="Pick date and time" />
            <Group justify="flex-end" mt="md">
              <Button type="submit">更新</Button>
            </Group>
          </form>
        </Group>
        <Group flex={1}>
          <form action="">
            <DateTimePicker label="底部活动倒计时" placeholder="Pick date and time" />
            <Group justify="flex-end" mt="md">
              <Button type="submit">更新</Button>
            </Group>
          </form>
        </Group>
      </Flex>
    </>
  );
}
