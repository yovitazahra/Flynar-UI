const formatDate = (rawDate: string): string => {
  const year = rawDate[0] + rawDate[1] + rawDate[2] + rawDate[3]
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
  return `${parseInt(`${rawDate[8]}${rawDate[9]}`)} ${months[parseInt(`${rawDate[5]}${rawDate[6]}`) - 1]} ${year}`
}

export default formatDate
