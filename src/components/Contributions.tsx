import { Text, VStack } from "@channel.io/bezier-react";

import classnames from "@/src/lib/classnames";

import Card from "./Card";
import styles from "./Contributions.module.css";

const THRESHOLDS = [0, 1, 5, 10, 30, Infinity]

export default function Contributions() {
  return (
    <div className={styles.wrap}>
      <Card>
        <VStack className={styles.container} spacing={8}>
          <Text as="h2" typo="14">
            {"{N}"} commits in the last year
          </Text>
          <div className={styles.tableContainer}>
            <ContributionsTable />
          </div>
        </VStack>
      </Card>
    </div>
  )
}

function startOfWeek(date: Date) {
  const day = date.getDay()
  const diff = date.getDate() - day
  return new Date(date.setDate(diff))
}

function addDays(date: Date, days: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

function weeksOfLastYear(): [Date[][], Date[][]] {
  const today = new Date()
  const thisWeekStart = startOfWeek(today)
  const lastYear = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
  const lastYearStartOfWeek = startOfWeek(lastYear)

  const weeks = []
  
  for (let weekStart = lastYearStartOfWeek; weekStart < thisWeekStart; weekStart = addDays(weekStart, 7)) {
    const week = []
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i)
      if (date.getTime() < today.getTime()) {
        week.push(date)
      }
    }
    weeks.push(week)
  }

  // transpose the array
  const transposed = []
  for (let i = 0; i < weeks[0].length; i++) {
    const row = []
    for (let j = 0; j < weeks.length; j++) {
      if (weeks[j][i]) {
        row.push(weeks[j][i])
      }
    }
    transposed.push(row)
  }

  return [weeks, transposed]
}

function groupByMonths(weeks: Date[][]): [Date, number][] {
  const months: [Date, number][] = []
  let current = -1
  for (const week of weeks) {
    const weekStart = week[0]
    if (current !== weekStart.getMonth()) {
      current = weekStart.getMonth()
      months.push([weekStart, 1])
    } else {
      months[months.length - 1][1]++
    }
  }

  return months
}

const [DATES_BY_WEEKS, DATES_BY_DAYS] = weeksOfLastYear()
const MONTHS = groupByMonths(DATES_BY_WEEKS)
function ContributionsTable() {
  return (
    <table className={styles.table}>
      <thead>
        <ContributionsTableHeader />
      </thead>
      <tbody>
        {DATES_BY_DAYS.map((row, index) => (
          <tr key={index}>
            <td className={styles.dayColumn}>
              {row[0].getDay() % 2 === 1 && (
                <Text typo="11" as="span" color="txt-black-darkest" className={styles.dayColumnLabel}>
                  {row[0].toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
              )}
            </td>

            {row.map((date) => (
              <DailyCommit
                key={date.toISOString()}
                amount={date.getDate()}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ContributionsTableHeader() {
  console.log(MONTHS)
  return (
    <tr>
      <td />
      {MONTHS.map(([month, count]) => (
        <td key={month.toISOString()} colSpan={count}>
          <Text typo="11" as="span" color="txt-black-darkest">
            {month.toLocaleDateString('en-US', { month: 'short' })}
          </Text>
        </td>
      ))}
    </tr>
  )
}

function DailyCommit({
  amount,
}: {
  amount: number
}) {
  const level = THRESHOLDS.findIndex((threshold) => amount < threshold) - 1
  
  return (
    <td className={classnames(styles.dailyCommit, styles[`level-${level}`])} />
  )
}
