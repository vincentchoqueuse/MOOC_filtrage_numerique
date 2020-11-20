from scipy import signal

#create system
H = signal.dlti([0.065,0.13,0.065],[1,-1.143,0.413])

# poles and zeros
print("Poles : {}".format(H.poles))
print("Zeros : {}".format(H.zeros))

z,p,k = signal.tf2zpk([0.065,0.13,0.065],[1,-1.143,0.413])
print(z)
print(p)
print(k)