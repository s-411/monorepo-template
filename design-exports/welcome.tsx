import { Icon } from "@iconify/react";

export function Welcome() {
	return (
		<div className="flex flex-col h-full bg-gradient-to-b from-background via-[#1a1135] to-secondary/30 text-foreground overflow-hidden relative">
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[10%] left-[15%] size-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
				<div className="absolute top-[25%] right-[10%] size-40 bg-accent/15 rounded-full blur-3xl animate-pulse delay-500" />
				<div className="absolute bottom-[30%] left-[8%] size-36 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
				<div className="absolute top-[15%] right-[25%] animate-pulse">
					<Icon icon="solar:star-bold" className="size-4 text-accent/70" />
				</div>
				<div className="absolute top-[35%] right-[15%] animate-pulse delay-300">
					<Icon icon="solar:star-bold" className="size-3 text-primary/60" />
				</div>
				<div className="absolute top-[45%] left-[20%] animate-pulse delay-700">
					<Icon icon="solar:star-bold" className="size-5 text-accent/50" />
				</div>
				<div className="absolute bottom-[40%] right-[30%] animate-pulse delay-500">
					<Icon icon="solar:star-bold" className="size-3 text-secondary/70" />
				</div>
				<div className="absolute top-[60%] left-[12%] animate-pulse delay-1000">
					<Icon icon="solar:star-bold" className="size-4 text-primary/50" />
				</div>
				<div className="absolute bottom-[25%] right-[18%] animate-pulse delay-200">
					<Icon icon="solar:star-bold" className="size-3 text-accent/60" />
				</div>
				<div className="absolute top-[20%] left-[35%] size-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl animate-pulse delay-400" />
				<div className="absolute bottom-[35%] right-[25%] size-24 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-xl animate-pulse delay-800" />
				<div className="absolute top-[50%] right-[8%] size-16 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-xl animate-pulse delay-600" />
			</div>
			<div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 relative z-10">
				<div className="text-center mb-8">
					<h1 className="text-5xl font-bold font-heading from-foreground leading-tight drop-shadow-lg mb-2">
						Welcome!
					</h1>
					<p className="text-xl text-accent font-medium drop-shadow-md">You're All Set</p>
				</div>
				<div className="relative w-full max-w-sm mb-10">
					<div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-secondary/30 to-accent/20 blur-3xl rounded-full animate-pulse" />
					<div className="relative flex items-center justify-center">
						<div className="absolute size-72 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/10 rounded-full blur-2xl animate-pulse delay-300" />
						<div className="absolute size-56 bg-gradient-to-tr from-accent/20 via-primary/15 to-secondary/25 rounded-full blur-xl animate-pulse delay-700" />
						<div className="relative bg-gradient-to-br from-primary/20 via-secondary/30 to-accent/10 rounded-full p-16 shadow-2xl shadow-primary/30">
							<div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-transparent rounded-full" />
							<div className="relative flex items-center justify-center">
								<div className="absolute size-32 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full animate-pulse" />
								<Icon
									icon="solar:confetti-bold"
									className="size-32 drop-shadow-2xl relative z-10 text-accent"
								/>
							</div>
							<div className="absolute top-6 right-8 animate-pulse delay-200">
								<Icon icon="solar:star-bold" className="size-6 text-accent" />
							</div>
							<div className="absolute bottom-8 left-6 animate-pulse delay-600">
								<Icon icon="solar:star-bold" className="size-5 text-accent/70" />
							</div>
							<div className="absolute top-12 left-4 animate-pulse delay-400">
								<Icon icon="solar:star-bold" className="size-4 text-primary/80" />
							</div>
						</div>
					</div>
					<div className="absolute top-4 right-8 animate-pulse">
						<Icon icon="solar:star-bold" className="size-7 text-accent drop-shadow-lg" />
					</div>
					<div className="absolute bottom-12 left-4 animate-pulse delay-400">
						<Icon icon="solar:star-bold" className="size-5 text-accent/70 drop-shadow-md" />
					</div>
					<div className="absolute top-20 left-0 animate-pulse delay-600">
						<Icon icon="solar:star-bold" className="size-6 text-primary/90 drop-shadow-lg" />
					</div>
					<div className="absolute bottom-24 right-2 animate-pulse delay-800">
						<Icon icon="solar:star-bold" className="size-4 text-secondary/80 drop-shadow-md" />
					</div>
					<div className="absolute top-32 right-16 animate-pulse delay-1000">
						<Icon icon="solar:star-bold" className="size-3 text-accent/60" />
					</div>
				</div>
				<div className="text-center space-y-4">
					<p className="text-lg text-foreground leading-relaxed max-w-md mx-auto drop-shadow-sm px-4">
						Your journey to better sleep starts now. Let's track your first night and discover
						insights about your rest patterns.
					</p>
				</div>
			</div>
			<div className="px-6 pb-8 space-y-4 relative z-10 w-full">
				<button className="w-full py-4 px-6 bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground rounded-2xl font-semibold text-lg shadow-2xl shadow-primary/40 relative overflow-hidden">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
					Start Tracking
				</button>
				<p className="text-center text-sm text-muted-foreground">
					Track your sleep tonight and wake up to personalized insights
				</p>
			</div>
		</div>
	);
}
