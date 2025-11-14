import { Icon } from "@iconify/react";

export function Home() {
	return (
		<div className="flex flex-col h-screen bg-background text-foreground">
			<div className="flex items-center justify-between px-6 py-4">
				<div>
					<h1 className="text-2xl font-semibold font-heading">Sleep Tracker</h1>
					<p className="text-sm text-muted-foreground">Thursday, Dec 14</p>
				</div>
				<button className="flex items-center justify-center size-11 rounded-full bg-card">
					<Icon icon="solar:bell-bold" className="size-6 text-foreground" />
				</button>
			</div>
			<div className="flex-1 px-6 pb-24">
				<div className="bg-card rounded-3xl p-6 mt-4">
					<div className="flex items-center justify-center mb-6">
						<div className="relative w-48 h-48">
							<svg className="w-full h-full -rotate-90">
								<circle
									r="80"
									cx="96"
									cy="96"
									fill="none"
									stroke="currentColor"
									className="text-input"
									strokeWidth="16"
								/>
								<circle
									r="80"
									cx="96"
									cy="96"
									fill="none"
									stroke="#7C5CFF"
									strokeWidth="16"
									strokeLinecap="round"
									strokeDasharray="502"
									strokeDashoffset="125"
								/>
							</svg>
							<div className="absolute inset-0 flex flex-col items-center justify-center">
								<div className="text-4xl font-semibold font-heading">7.5</div>
								<div className="text-sm text-muted-foreground">hours</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="bg-background/50 rounded-2xl p-4 flex flex-col items-center">
							<Icon icon="solar:moon-sleep-bold" className="size-8 text-primary mb-2" />
							<div className="text-2xl font-semibold font-heading">7h 30m</div>
							<div className="text-xs text-muted-foreground mt-1">Duration</div>
						</div>
						<div className="bg-background/50 rounded-2xl p-4 flex flex-col items-center">
							<Icon icon="solar:star-bold" className="size-8 text-accent mb-2" />
							<div className="text-2xl font-semibold font-heading">85%</div>
							<div className="text-xs text-muted-foreground mt-1">Quality</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<h2 className="text-lg font-semibold font-heading mb-4">Recent Sleep Sessions</h2>
					<div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
						<div className="bg-card rounded-2xl p-4 min-w-[160px] flex-shrink-0">
							<div className="text-xs text-muted-foreground mb-2">Last Night</div>
							<div className="text-2xl font-semibold font-heading mb-1">7h 30m</div>
							<div className="flex items-center gap-1">
								<Icon icon="solar:star-bold" className="size-4 text-accent" />
								<span className="text-sm font-medium text-accent">85%</span>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4 min-w-[160px] flex-shrink-0">
							<div className="text-xs text-muted-foreground mb-2">Dec 13</div>
							<div className="text-2xl font-semibold font-heading mb-1">8h 15m</div>
							<div className="flex items-center gap-1">
								<Icon icon="solar:star-bold" className="size-4 text-accent" />
								<span className="text-sm font-medium text-accent">92%</span>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4 min-w-[160px] flex-shrink-0">
							<div className="text-xs text-muted-foreground mb-2">Dec 12</div>
							<div className="text-2xl font-semibold font-heading mb-1">6h 45m</div>
							<div className="flex items-center gap-1">
								<Icon icon="solar:star-bold" className="size-4 text-accent" />
								<span className="text-sm font-medium text-accent">78%</span>
							</div>
						</div>
						<div className="bg-card rounded-2xl p-4 min-w-[160px] flex-shrink-0">
							<div className="text-xs text-muted-foreground mb-2">Dec 11</div>
							<div className="text-2xl font-semibold font-heading mb-1">7h 50m</div>
							<div className="flex items-center gap-1">
								<Icon icon="solar:star-bold" className="size-4 text-accent" />
								<span className="text-sm font-medium text-accent">88%</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6">
					<div className="flex flex-col gap-3">
						<button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-base shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
							<Icon icon="solar:play-circle-bold" className="size-6" />
							Start Sleep Session
						</button>
					</div>
				</div>
			</div>
			<div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
				<div className="flex items-center justify-around py-3">
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:home-2-bold" className="size-6 text-primary" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:chart-bold" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="mdi:clock" className="size-6 text-muted-foreground" />
					</button>
					<button className="flex flex-col items-center gap-1 px-4 py-2">
						<Icon icon="solar:user-bold" className="size-6 text-muted-foreground" />
					</button>
				</div>
			</div>
		</div>
	);
}
