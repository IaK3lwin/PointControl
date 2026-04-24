export default class Cronus {
  private seconds: number = 0
  private minutes: number = 0
  private hours: number = 0
  private isFinish: boolean = false
  private duration: number | null = null
  private typeDuration: 'm' | 's' | 'h' = 'm'

  private callback: (() => void) | null = null
  private run: boolean = false

  private idRun: ReturnType<typeof setInterval> | null = null

  private loop(): void {
    this.seconds++

    if (this.seconds >= 60) {
      this.seconds = 0
      this.minutes++
    }

    if (this.minutes >= 60) {
      this.minutes = 0
      this.hours++
    }

    if (this.callback && this.run) {
      this.callback()
    }
  }

  private loopWithDuration(): boolean {
    this.loop()

    if (this.duration === null) {
      return false
    }

    // Calcula tudo em segundos para evitar o bug de reset (quando chega a 60 e volta a 0)
    const currentTotalSeconds = this.seconds + (this.minutes * 60) + (this.hours * 3600)
    let targetTotalSeconds = this.duration

    if (this.typeDuration === 'm') targetTotalSeconds *= 60
    if (this.typeDuration === 'h') targetTotalSeconds *= 3600

    if (currentTotalSeconds == targetTotalSeconds) this.isFinish = true

    return currentTotalSeconds >= targetTotalSeconds
  }

  public setCallback(callback: () => void): void {
    this.callback = callback
  }

  private clearTimer(): void {
    if (this.idRun !== null) {
      clearInterval(this.idRun)
      this.idRun = null
    }
  }

  private createTimer(): void {
    this.clearTimer()

    this.idRun = setInterval(() => {
      if (!this.run) {
        this.clearTimer()
        return
      }

      if (this.duration !== null) {
        const ended = this.loopWithDuration()

        if (ended) {
          this.stop()
        }

        return
      }

      this.loop()
    }, 1000)
  }

  public start(duration?: number, target?: 'm' | 'h' | 's'): void {
    this.seconds = 0
    this.minutes = 0
    this.hours = 0

    if (duration !== undefined && duration > 0) {
      this.duration = duration
      this.typeDuration = target ?? 'm'
    } else {
      this.duration = null
      this.typeDuration = 'm'
    }

    this.run = true
    this.createTimer()
    
    // Atualiza a interface logo ao dar o start
    if (this.callback) this.callback()
  }

  public pause(): void {
    this.run = false
    this.clearTimer()
    
    // Atualiza a interface ao pausar
    if (this.callback) this.callback()
  }

  public resume(): void {
    if (this.run) return

    this.run = true
    this.createTimer()
    
    // Atualiza a interface ao resumir
    if (this.callback) this.callback()
  }

  public stop(): void {
    this.run = false
    this.clearTimer()

    this.seconds = 0
    this.minutes = 0
    this.hours = 0

    this.duration = null
    this.typeDuration = 'm'

    // Essencial: Atualiza o Svelte dizendo que run agora � false e os contadores est�o zerados
    if (this.callback) this.callback()
  }

  public isRun(): boolean {
    return this.run
  }

  public getIsfinish(): boolean {
    return this.isFinish
  }

  public getSeconds(): number {
    return this.seconds
  }

  public getMinutes(): number {
    return this.minutes
  }

  public getHours(): number {
    return this.hours
  }

  public getHourFormat(): string {
    return `${this.twoDigits(this.hours)}:${this.twoDigits(this.minutes)}:${this.twoDigits(this.seconds)}`
  }

  private twoDigits(n: number): string {
    return String(n).padStart(2, '0')
  }
}