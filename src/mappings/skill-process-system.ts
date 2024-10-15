import { Player, SkillProcess } from '../types/schema'
import { CreationProcessCompletedEvent } from '../types/templates/SkillProcessSystem/SkillProcessSystem'

export function handleCreationProcessCompleted(event: CreationProcessCompletedEvent): void {
  let player = Player.load(event.params.playerId.toString())
  if (!player) {
    player = new Player(event.params.playerId.toString())
    player.save()
  }

  const skillProcess = new SkillProcess(event.params.playerId.toString() + '-' + event.params.sequenceNumber.toString())
  skillProcess.player = player.id
  skillProcess.skillType = event.params.skillType
  skillProcess.itemId = event.params.itemId.toI32()
  skillProcess.startedAt = event.params.startedAt
  skillProcess.creationTime = event.params.creationTime
  skillProcess.endedAt = event.params.endedAt
  skillProcess.successful = event.params.successful
  skillProcess.quantity = event.params.quantity.toI32()
  skillProcess.experienceGained = event.params.experienceGained.toI32()
  skillProcess.newLevel = event.params.newLevel
  skillProcess.save()
}
