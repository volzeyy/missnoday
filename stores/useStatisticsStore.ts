import { create } from 'zustand';

import StatisticsProps from '@/types/StatisticsProps';

interface StatisticsState {
    statistics: Partial<StatisticsProps>;
    setStatistics: (statistics: Partial<StatisticsProps>) => void;
    clearStatistics: () => void;
}

const useStatisticsStore = create<StatisticsState>((set) => ({
    statistics: {
        highest_streak: 0,
        habits_focused_on: 0,
        habits_done: 0,
        habits_not_done: 0,
    },
    setStatistics: (statistics: Partial<StatisticsProps>) => set({statistics}),
    clearStatistics: () => set({
        statistics: {
            highest_streak: 0,
            habits_focused_on: 0,
            habits_done: 0,
            habits_not_done: 0,
        },
    }),
}));

export default useStatisticsStore;