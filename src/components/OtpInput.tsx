import { useMemo } from 'react'
import { RE_DIGIT } from '../constants/index'

export interface Props {
  value: string
  valueLength: number
  onChange: (value: string) => void
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const OtpInput = ({ value, valueLength, onChange }: Props) => {
  const valueItems = useMemo(() => {
    const valueArray = value.split('')
    const items: string[] = []

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i]

      if (RE_DIGIT.test(char)) {
        items.push(char)
      } else {
        items.push('')
      }
    }

    return items
  }, [value, valueLength])

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ): void => {
    const target = e.target
    let targetValue = target.value
    const isTargetValueDigit = RE_DIGIT.test(targetValue)

    if (!isTargetValueDigit && targetValue !== '') {
      return
    }

    targetValue = isTargetValueDigit ? targetValue : ' '

    const newValue =
      value.substring(0, idx) + targetValue + value.substring(idx + 1)

    onChange(newValue)

    if (!isTargetValueDigit) {
      return
    }

    const nextElementSibling =
      target.nextElementSibling as HTMLInputElement | null

    if (nextElementSibling != null) {
      nextElementSibling.focus()
    }
  }

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    const target = e.target as HTMLInputElement

    if (e.key !== 'Backspace' || target.value !== '') {
      return
    }

    const previousElementSibling =
      target.previousElementSibling as HTMLInputElement | null

    if (previousElementSibling != null) {
      previousElementSibling.focus()
    }
  }

  return (
    <div className='flex gap-x-4 my-8 w-full justify-center'>
      {valueItems.map((digit, idx) => (
        <input
          key={idx}
          type='text'
          inputMode='numeric'
          autoComplete='one-time-code'
          pattern='\d{1}'
          maxLength={valueLength}
          onChange={(e) => { inputOnChange(e, idx) }}
          onKeyDown={(e) => { inputOnKeyDown(e) }}
          className='border rounded-lg font-bold w-6 text-center'
          value={digit}
        />
      ))}
    </div>
  )
}

export default OtpInput
