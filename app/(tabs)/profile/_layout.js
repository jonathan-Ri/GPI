import { Stack } from 'expo-router/stack';

export default function AppLayout() {
  return (
    <Stack>
              <Stack.Screen name  = "index" options={{headerShown: false}}/>
              <Stack.Screen name  = "publicar" options={{headerShown: false}}/>
              <Stack.Screen name  = "myposts" options={{headerShown: false}}/>
              <Stack.Screen name  = "editpost" options={{headerShown: false}}/>

    </Stack>
  );
}
