import { Icon } from "@iconify/react";

export function SleepDetails() {
	return (
		<div className="flex flex-col h-screen bg-background text-foreground">
			<div className="flex items-center justify-between px-6 py-4">
				<button className="flex items-center justify-center size-11 rounded-full bg-card">
					<Icon icon="solar:arrow-left-linear" className="size-6 text-foreground" />
				</button>
				<h1 className="text-lg font-semibold font-heading">Sleep Analysis</h1>
				<div className="size-11" />
			</div>
			<div className="flex-1 px-6 pb-24">
				<div className="bg-card rounded-3xl p-6 mt-4">
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className="text-2xl font-semibold font-heading">7h 32m</h2>
							<p className="text-sm text-muted-foreground">Wed, Dec 13</p>
						</div>
						<div className="flex flex-col items-end">
							<div className="flex items-center gap-1">
								<div className="text-3xl font-semibold font-heading text-accent">88</div>
								<div className="text-lg text-muted-foreground">/100</div>
							</div>
							<div className="text-sm text-accent">Excellent</div>
						</div>
					</div>
					<div className="flex items-center justify-between py-4 border-t border-border">
						<div className="flex items-center gap-3">
							<Icon icon="solar:moon-sleep-bold" className="size-5 text-primary" />
							<span className="text-sm text-muted-foreground">Fell asleep</span>
						</div>
						<span className="text-base font-semibold">10:28 PM</span>
					</div>
					<div className="flex items-center justify-between py-4 border-t border-border">
						<div className="flex items-center gap-3">
							<Icon icon="solar:sunrise-bold" className="size-5 text-accent" />
							<span className="text-sm text-muted-foreground">Woke up</span>
						</div>
						<span className="text-base font-semibold">6:00 AM</span>
					</div>
					<div className="flex items-center justify-between py-4 border-t border-border">
						<div className="flex items-center gap-3">
							<Icon icon="solar:chart-bold" className="size-5 text-secondary" />
							<span className="text-sm text-muted-foreground">Sleep efficiency</span>
						</div>
						<span className="text-base font-semibold text-accent">92%</span>
					</div>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Sleep Stages</h2>
					<div className="bg-card rounded-3xl p-6">
						<div className="relative h-40 mb-6">
							<div className="absolute inset-0 flex items-end justify-between gap-1">
								<div className="flex-1 bg-primary h-24 rounded-t-lg" />
								<div className="flex-1 bg-primary h-32 rounded-t-lg" />
								<div className="flex-1 bg-primary h-28 rounded-t-lg" />
								<div className="flex-1 bg-primary h-20 rounded-t-lg" />
								<div className="flex-1 bg-primary h-16 rounded-t-lg" />
								<div className="flex-1 bg-primary h-28 rounded-t-lg" />
								<div className="flex-1 bg-primary h-36 rounded-t-lg" />
								<div className="flex-1 bg-primary h-32 rounded-t-lg" />
								<div className="flex-1 bg-primary h-24 rounded-t-lg" />
								<div className="flex-1 bg-primary h-20 rounded-t-lg" />
								<div className="flex-1 bg-primary h-28 rounded-t-lg" />
								<div className="flex-1 bg-primary h-32 rounded-t-lg" />
							</div>
						</div>
						<div className="flex items-center justify-between text-xs text-muted-foreground mb-6">
							<span>10:30 PM</span>
							<span>2:00 AM</span>
							<span>6:00 AM</span>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="flex items-center gap-3">
								<div className="size-3 rounded-full bg-primary" />
								<div>
									<div className="text-sm font-medium">Deep</div>
									<div className="text-xs text-muted-foreground">2h 15m</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="size-3 rounded-full bg-secondary" />
								<div>
									<div className="text-sm font-medium">Light</div>
									<div className="text-xs text-muted-foreground">3h 45m</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="size-3 rounded-full bg-accent" />
								<div>
									<div className="text-sm font-medium">REM</div>
									<div className="text-xs text-muted-foreground">1h 32m</div>
								</div>
							</div>
							<div className="flex items-center gap-3">
								<div className="size-3 rounded-full bg-muted" />
								<div>
									<div className="text-sm font-medium">Awake</div>
									<div className="text-xs text-muted-foreground">18m</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Environment</h2>
					<div className="grid grid-cols-2 gap-4">
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-center gap-2 mb-2">
								<div className="size-10 rounded-full bg-chart-2/20 flex items-center justify-center">
									<Icon icon="solar:volume-bold" className="size-5 text-accent" />
								</div>
							</div>
							<div className="text-2xl font-semibold font-heading">32 dB</div>
							<div className="text-sm text-muted-foreground mt-1">Noise Level</div>
							<div className="text-xs text-accent mt-1">Quiet</div>
						</div>
						<div className="bg-card rounded-2xl p-4">
							<div className="flex items-center gap-2 mb-2">
								<div className="size-10 rounded-full bg-chart-5/20 flex items-center justify-center">
									<Icon
										icon="solar:temperature-bold"
										style={{ color: "#FFD479" }}
										className="size-5"
									/>
								</div>
							</div>
							<div className="text-2xl font-semibold font-heading">68°F</div>
							<div className="text-sm text-muted-foreground mt-1">Temperature</div>
							<div className="text-xs text-accent mt-1">Optimal</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Insights & Tips</h2>
					<div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-5 border border-primary/30">
						<div className="flex items-start gap-3">
							<div className="size-10 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0">
								<Icon icon="solar:lightbulb-bold" className="size-5 text-primary" />
							</div>
							<div>
								<h3 className="font-semibold mb-2">Great sleep quality!</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									You got 2h 15m of deep sleep, which is excellent for recovery. Your sleep
									efficiency of 92% shows you're spending most of your time in bed actually
									sleeping.
								</p>
							</div>
						</div>
					</div>
					<div className="bg-card rounded-2xl p-5 mt-4 border border-border">
						<div className="flex items-start gap-3">
							<div className="size-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
								<Icon icon="solar:star-bold" className="size-5 text-accent" />
							</div>
							<div>
								<h3 className="font-semibold mb-2">Tip for tonight</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									Try to maintain consistent sleep and wake times. Going to bed around 10:30 PM has
									been working well for you.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
				<div className="flex items-center justify-around py-3">
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:home-2-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:chart-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="mdi:clock" className="size-6 text-primary" />
					</button>
					<button className="flex items-center px-4 py-2 justify-center">
						<Icon icon="solar:user-bold" className="size-6 text-muted-foreground" />
					</button>
				</div>
			</div>
		</div>
	);
}
