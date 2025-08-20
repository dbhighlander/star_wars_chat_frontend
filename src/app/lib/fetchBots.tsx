export async function fetchBots() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STAR_WARS_PUBLIC_API_URL}/bots`, {
      method: 'GET',
    });

    if (!response.ok) {
      // Check for non-200 status
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Bots data:', data);

    if (data.result == 'success') {
      return data.details;
    } else {
      console.error("Can't load bots");
    }
  } catch (error) {
    console.error('Failed to fetch bots:', error);
    return null;
  }
}
