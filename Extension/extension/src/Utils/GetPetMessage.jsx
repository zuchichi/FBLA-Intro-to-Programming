import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Pages/firebase';

export function getPetMessage({ petHunger, petHealth, petEnergy, petCleanliness }) {
  if (petHealth < 20)       return "I don't feel so good... go to the marketplace to find something to make me feel better!";
  if (petHunger > 75)       return "I'm starving! Could I get some food?";
  if (petEnergy < 20)       return "I'm exhausted.. could I get some sleep?";
  if (petCleanliness < 20)  return "I'm a bit gross right now, could you bathe me?"
  if (petHunger > 50)       return "I could go for a snack!";
  return "I'm doing just fine today!";
}

export async function syncPetNote(updatedStats) {
  const user = auth.currentUser;
  if (!user) return;
  const note = getPetMessage(updatedStats);
  await updateDoc(doc(db, "users", user.uid), { petNote: note });
}