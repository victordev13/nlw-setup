import { useRoute } from '@react-navigation/native';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { BackButton } from '../components/BackButton';
import { CheckBox } from '../components/Checkbox';
import { HabitsEmpty } from '../components/HabitsEmpty';
import { Loading } from '../components/Loading';
import { ProgressBar } from '../components/ProgressBar';
import { api } from '../lib/axios';
import { generateProgessPercentage } from '../utils/generateProgessPercentage';

interface Params {
  date: string;
}

interface DayInfoProps {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function Habit() {
  const [isLoading, setIsLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<DayInfoProps>({
    possibleHabits: [],
    completedHabits: [],
  });

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  const habitsProgress =
    dayInfo.possibleHabits.length > 0
      ? generateProgessPercentage(
          dayInfo.possibleHabits.length,
          dayInfo.completedHabits.length
        )
      : 0;

  const isDateInPast = parsedDate.endOf('day').isBefore(new Date());

  async function fetchDayHabits() {
    setIsLoading(true);
    try {
      const { data } = await api.get('day', { params: { date } });

      setDayInfo(data);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não conseguimos carregar os hábitos deste dia 😢');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    try {
      await api.patch(`habits/${habitId}/toggle`);
    } catch (error) {
      console.log(error);
      Alert.alert('Ops', 'Não conseguimos atualizar o status do hábito 😢');
    }
    const isHabitAlreadyCompleted = dayInfo.completedHabits.includes(habitId);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = dayInfo.completedHabits.filter((id) => id !== habitId);
    } else {
      completedHabits = [...dayInfo.completedHabits, habitId];
    }

    setDayInfo({
      ...dayInfo,
      completedHabits,
    });
  }

  useEffect(() => {
    fetchDayHabits();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className='mt-6 text-zinc-400 font-semibold text-base lowercase'>
          {dayOfWeek}
        </Text>
        <Text className='text-white font-extrabold text-3xl'>
          {dayAndMonth}
        </Text>

        <ProgressBar progress={habitsProgress} />

        <View
          className={clsx('mt-6', {
            ['opacity-50']: isDateInPast,
          })}
        >
          {dayInfo.possibleHabits.length > 0 ? (
            dayInfo.possibleHabits.map((habit) => (
              <CheckBox
                key={habit.id}
                label={habit.title}
                checked={dayInfo.completedHabits.includes(habit.id)}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={isDateInPast}
              />
            ))
          ) : (
            <HabitsEmpty />
          )}
        </View>
        {isDateInPast && (
          <Text className='text-zinc-200 mt-10 text-center'>
            Você não pode editar um hábito de uma data passada.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
