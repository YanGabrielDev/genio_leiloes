import { loadStripe } from '@stripe/stripe-js'

export const stripePromise = loadStripe(
  'pk_test_51RR0mOPQEUHa00NVZcL6dOBNiGZ4S3WkHfojcMawDX7F8ihzKXah5fpCeMIJscsclFHc44M5BH6hIlRy0HgTSNKJ00XqGNI4DC'
) // Sua public key
