import { useNavigation } from '@react-navigation/native';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import HabitDay, { DAY_SIZE } from '../components/HabitDay';
import Header from '../components/Header';
import { Loading } from '../components/Loading';
import { api } from '../lib/axios';
import { generateDatesFromYearBeginning } from '../utils/generateDatesFromYearBeginning';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning();
const minimumSummaryDateSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDateSizes - datesFromYearStart.length;

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>;

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<Summary>([]);

  const { navigate } = useNavigation();

  async function fetchSummary() {
    setIsLoading(true);

    try {
      const { data } = await api.get('summary');
      console.log(data);
      setSummary(data);
    } catch (error) {
      Alert.alert('Ops', 'Não conseguimos buscar os seus hábitos😢');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSummary();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
          >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className='flex-row flex-wrap'>
          {datesFromYearStart.map((date) => {
            const dayHabits = summary.find((day) =>
              dayjs(date).isSame(day.date, 'day')
            );

            return (
              <HabitDay
                key={date.toISOString()}
                onPress={() => navigate('habit', { date: date.toISOString() })}
                date={date}
                amountOfHabits={dayHabits?.amount}
                amountCompleted={dayHabits?.completed}
              />
            );
          })}

          {amountOfDaysToFill > 0 &&
            Array.from({ length: amountOfDaysToFill }).map((_, index) => (
              <View
                className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                style={{
                  width: DAY_SIZE,
                  height: DAY_SIZE,
                }}
                key={index}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
}
