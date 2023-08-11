import { Project } from "@/types/project"

export default function validateProject(project: Partial<Project>): project is Project {
    if (
        typeof project.paymentTokenAddress !== "string" ||
        typeof project.projectTokenAddress !== "string" ||
        typeof project.contractAddress !== "string" ||
        typeof project.description !== "string" ||
        typeof project.vesting !== "string" ||
        typeof project.ticker !== "string" ||
        typeof project.name !== "string" ||
        typeof project.logo !== "string" ||
        typeof project.id !== "string" ||
        (project.twitter && typeof project.twitter !== "string") ||
        (project.telegram && typeof project.telegram !== "string") ||
        (project.website && typeof project.website !== "string") ||
        (project.github && typeof project.github !== "string") ||
        (project.medium && typeof project.medium !== "string") ||
        (project.discord && typeof project.discord !== "string") ||
        project.paymentTokenAddress.length === 0 ||
        project.projectTokenAddress.length === 0 ||
        project.contractAddress.length === 0
    ) {
        return false
    }

    if (
        !(project.roundOneStartDate instanceof Date) ||
        !(project.roundTwoStartDate instanceof Date) ||
        !(project.saleEndDate instanceof Date) ||
        project.roundOneStartDate >= project.roundTwoStartDate ||
        project.roundTwoStartDate >= project.saleEndDate
    ) {
        return false
    }

    if (
        typeof project.paymentTokenDecimals !== "number" ||
        typeof project.tokensPerPaymentToken !== "number" ||
        typeof project.projectTokenDecimals !== "number" ||
        typeof project.totalRaising !== "number" ||
        project.paymentTokenDecimals < 0 ||
        project.tokensPerPaymentToken <= 0 ||
        project.projectTokenDecimals < 0 ||
        project.totalRaising <= 0
    ) {
        return false
    }

    if (
        !Array.isArray(project.vestingReleasePercentages) ||
        !Array.isArray(project.vestingTimestamps) ||
        project.vestingReleasePercentages.length !== project.vestingTimestamps.length ||
        project.vestingReleasePercentages.some(percentage => typeof percentage !== "number" || percentage <= 0) ||
        project.vestingTimestamps.some(timestamp => !(timestamp instanceof Date)) ||
        project.vestingReleasePercentages.reduce((sum, percentage) => sum + percentage, 0) !== 1000
    ) {
        return false
    }

    if (
        !Array.isArray(project.tokenomics) ||
        project.tokenomics.some(
            tokenomic =>
                typeof tokenomic.title !== "string" ||
                tokenomic.title.length === 0 ||
                typeof tokenomic.value !== "number" ||
                tokenomic.value < 0
        )
    ) {
        return false
    }

    if (project.publicRoundOne && (typeof project.publicRoundOneCap !== "number" || project.publicRoundOneCap <= 0)) {
        return false
    }

    if (project.publicRoundTwo && (typeof project.publicRoundTwoCap !== "number" || project.publicRoundTwoCap <= 0)) {
        return false
    }

    return true
}
