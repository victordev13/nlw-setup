export declare global {
  namespace ReactNavigation {
    // define routes to use in navigate()
    interface RootParamList {
      home: undefined;
      newHabit: undefined;
      habit: {
        date: string;
      };
    }
  }
}
