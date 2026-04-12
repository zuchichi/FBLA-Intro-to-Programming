// utils/decayStats.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Pages/firebase';
import { syncPetNote } from './GetPetMessage';

const DECAY_PER_HOUR = {
  petHunger: 3600,        // Hunger goes up (more hungry)
  petEnergy: 3600,        // Energy goes down
  petCleanliness: 3600,   // Gets dirtier
  petHealth: 3600,        // Health slowly drops
};

const DECAY_FLOOR = {
  petHunger: 90,        // Hunger goes up (more hungry)
  petEnergy: 10,        // Energy goes down
  petCleanliness: 80,   // Gets dirtier
  petHealth: 10,        // Health slowly drops
};

const MINIMUMS = {
    petHunger: 95,
    petEnergy: 5,
    petHealth: 15,
    petCleanliness: 5,
};

export async function applyDecay() {
  const user = auth.currentUser;
  if (!user) return;

  const snap = await getDoc(doc(db, "users", user.uid));
  if (!snap.exists()) return;

  const data = snap.data();
  const now = Date.now();
  const lastUpdated = data.lastUpdated ?? now;
  const hoursElapsed = (now - lastUpdated) / (1000 * 60 * 60);

  // if (hoursElapsed < 0.1) return; // less than 6 mins, don't bother

  const updates = { lastUpdated: now };

  updates.petHunger      = Math.max(DECAY_FLOOR.petEnergy, (data.petEnergy ?? 100) - DECAY_PER_HOUR.petEnergy * hoursElapsed);
  updates.petEnergy      = Math.max(DECAY_FLOOR.petCleanliness, (data.petCleanliness ?? 100) - DECAY_PER_HOUR.petCleanliness * hoursElapsed);
  updates.petCleanliness = Math.max(DECAY_FLOOR.petHealth, (data.petHealth ?? 100) - DECAY_PER_HOUR.petHealth * hoursElapsed);
  updates.petHealth      = Math.min(100, (data.petHunger ?? 0) + DECAY_PER_HOUR.petHunger * hoursElapsed);

  await updateDoc(doc(db, "users", user.uid), updates);
  await syncPetNote({ ...data, ...updates });
}