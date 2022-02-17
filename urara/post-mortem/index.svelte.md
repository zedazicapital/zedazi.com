---
title: '3 offline events at end of the session while as a active validator: A Post-Mortem'
date: 2022-02-17
lastmod: 2022-02-17
tags:
  - 'Post Mortem'
  - 'Offline event'
  - 'Validator'
  - 'Fault'
---
*Zedazi Capital node 02 unexpected database corruption lead to failure of validating in the active set causing 3 faults; one for being found offline at the end of the session and 2 for the lack of intention to validate after chilling the validator to guarantee safety against slashing event while in the active set.*  

Zedazi Capital 02 became an invalid 1KV validator on February 17th, 2022, 08:15:23 while being an active validator in the set leading to be found offline at the end of the session in block [11444673](https://kusama.subscan.io/event/11444673).  
This caused Zedazi Capital 02 validator rank in 1KV Validator Program to be decreased from 6 to 5 and automatic [chilling](https://wiki.polkadot.network/docs/learn-staking#chilling) of the validator node leading to commission be set 0% stop intention to validate.  
Kusama 1KV program does not allow chilling while in the active set which caused 2 more faults([11445854](https://kusama.subscan.io/block/11445854) and [11445263](https://kusama.subscan.io/block/11445263)) to be logged for lack of intention to validate, but no further rank losses or risk of funds to be slashed.  

```
polkadot[79293]: 2022-02-17 09:07:47 DB has been previously marked as corrupted, attempting repair
```
We are currently investigating the cause of the database corruption, but a clear reason has not been found. Node was functioning around 67% disk space capacity during the database corruption, which might have played a role. We had just a few days earlier raised the disk partition size to 800GB to be certain that disk space would not become a problem. 
```
/dev/sda3      203308136 127480784  65430220  67% 
3      2150MB  859GB   857GB   ext4
```
Thanks to Adrian from [Generic Chain](https://polkachu.com/kusama/thousand_validators/EiMA69PZWju1jmisAU3ubN4wJQgBexnFXZpWb7aMtftP5rV), who notified that the most likely reason for the whole partition space not being used would be a lack of resizing the file system. This issue was solved simply with the following command:
```
sudo resize2fs /dev/sda3
```
Zedazi Capital 02 is now running with over 800Gb disk space for the pruned Kusama chain, which should be fine for years to come. 
After fixing the disk space we downloaded RocksDb database from Polkashots for rapid recovery and spin the node back up and running at 19:16 to generate profits for our nominators.  
  
Even the fault wasn't necessarily a fault of Zedazi Capital's actions, there is a lot of space for improvement in the response. 
We have now bought and set up a backup node to be able to respond more rapidly to these kinds of events without being forced to rush investigations.
Next step is to improve our monitoring alarms to lower the response time that end up being multiple hours due to maintainer sleeping during the active set.
We are also investigating possibility to program automatic rotation of the sessionkey to backup node to avoid such faults completely.  
